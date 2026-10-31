import { getFood } from "@/lib/queries";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const food = await getFood(id);
  if (!food) {
    return Response.json({ message: "Makanan tidak ditemukan." }, { status: 404 });
  }
  return Response.json(food);
}