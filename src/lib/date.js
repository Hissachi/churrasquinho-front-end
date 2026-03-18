import { formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatarDataRelativa(data) {
  const date = new Date(data.replace("Z", ""));

  if (isToday(date)) {
    return "Hoje";
  }

  if (isYesterday(date)) {
    return "Ontem";
  }

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });
}
