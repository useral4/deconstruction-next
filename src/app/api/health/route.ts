export function GET() {
  return Response.json({
    status: "ok",
    service: "deconstruction-next",
    timestamp: new Date().toISOString(),
  });
}
