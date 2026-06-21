import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '';

export const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  fetch,
});

/**
 * Helper for fetching with revalidation tags
 */
export const fetchGraphQL = async <T>(
  query: string,
  variables?: Record<string, unknown>,
  tags: string[] = []
): Promise<T> => {
  return client.request<T>({
    document: query,
    variables,
    requestHeaders: {},
    signal: undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ next: { tags } } as any),
  });
};
