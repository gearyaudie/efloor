export type B2BProject = {
  _id: string;
  type?: string;
  namaBarang?: string;
  namaPT?: string;
  quantity?: string;
  tanggal?: string;
  photo?: {
    asset?: {
      url: string;
    };
  };
};

export function formatDate(tanggal?: string) {
  if (!tanggal) return undefined;
  const date = new Date(tanggal);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}
