export interface HealthResponse {
  status: 'ok';
  service: string;
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch('/api/health');
  if (!response.ok) throw new Error('Health check failed: HTTP ' + response.status);
  return (await response.json()) as HealthResponse;
}
