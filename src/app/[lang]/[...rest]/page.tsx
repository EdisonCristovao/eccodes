import { notFound } from "next/navigation";

/**
 * Catch-all: qualquer URL sob /en ou /pt que não exista cai aqui e dispara
 * o `not-found.tsx` deste segmento (404 no idioma da rota, dentro do layout).
 * Sem isto o Next responderia com a página 404 padrão, fora do layout.
 */
export default function CatchAll() {
  notFound();
}
