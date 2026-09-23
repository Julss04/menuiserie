import { NextResponse, type NextRequest } from "next/server";

/**
 * Protège l'espace bénévoles (/admin) par un mot de passe partagé,
 * demandé par le navigateur (identifiant libre, mot de passe = ADMIN_PASSWORD).
 */
export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    // En local, sans mot de passe défini, on laisse passer pour pouvoir tester.
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return new NextResponse("Espace bénévoles fermé : ADMIN_PASSWORD n'est pas configuré.", { status: 503 });
  }

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const given = decoded.slice(decoded.indexOf(":") + 1);
    if (given === password) return NextResponse.next();
  }

  return new NextResponse("Mot de passe requis.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Espace benevoles L\'Annexe", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
