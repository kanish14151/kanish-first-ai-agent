type GoogleSearchConfig = {
  apiKey: string;
  cx: string;
};

type ErrorWithStatus = {
  response?: {
    status?: number;
  };
};

const getEnvValue = (...names: string[]) => {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }

  return "";
};

export class GoogleSearchServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "GoogleSearchServiceError";
    this.statusCode = statusCode;
  }
}

export const getGoogleSearchConfig = (): GoogleSearchConfig => {
  const apiKey = getEnvValue("GOOGLE_API_KEY");
  const cx = getEnvValue("GOOGLE_CX", "GOOGLE_CX_KEY");

  if (!apiKey || !cx) {
    throw new GoogleSearchServiceError(
      "Missing Google Custom Search configuration. Set GOOGLE_API_KEY and GOOGLE_CX.",
      500,
    );
  }

  return { apiKey, cx };
};

export const normalizeGoogleSearchError = (error: unknown): never => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const statusCode = (error as ErrorWithStatus).response?.status;

    if (statusCode === 403) {
      throw new GoogleSearchServiceError(
        "Google Custom Search rejected the configured API key or search engine ID.",
        502,
      );
    }

    if (statusCode === 400) {
      throw new GoogleSearchServiceError(
        "Google Custom Search request is invalid. Check GOOGLE_API_KEY and GOOGLE_CX configuration.",
        502,
      );
    }

    throw new GoogleSearchServiceError(
      `Google Custom Search request failed${statusCode ? ` with status ${statusCode}` : ""}.`,
      502,
    );
  }

  if (error instanceof GoogleSearchServiceError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new GoogleSearchServiceError(error.message, 500);
  }

  throw new GoogleSearchServiceError("Google Custom Search request failed.", 500);
};