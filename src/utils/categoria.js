export function buildCategoriaTree(categorias = []) {
  const map = {};
  const roots = [];

  categorias.forEach((cat) => {
    map[cat.id] = { ...cat, children: [] };
  });

  categorias.forEach((cat) => {
    const parentId = Number(cat.parent_id);

    if (parentId) {
      map[parentId]?.children.push(map[cat.id]);
    } else {
      roots.push(map[cat.id]);
    }
  });

  return roots;
}