export async function fetchSvg(url: string): Promise<string> {
  const response = await fetch(url);
  return await response.text();
}

function applyTransformation(path: SVGPathElement): string {
  const d = path.getAttribute("d") || "";
  const transform = path.getAttribute("transform");

  if (!transform) {
    return d;
  }

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.appendChild(path.cloneNode(true));

  const svgTemp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgTemp.appendChild(g);

  const matrix = g.transform.baseVal.consolidate()?.matrix;
  if (!matrix) {
    return d;
  }

  return transformPathData(d, matrix);
}

function transformPathData(d: string, matrix: DOMMatrix): string {
  return d.replace(
    /([MLCSTQAHVZ])([^MLCSTQAHVZ]*)/gi,
    (match, command, values) => {
      const transformedValues = values
        .trim()
        .split(/[\s,]+/)
        .map((val: any, i: number) => {
          const num = parseFloat(val);
          if (isNaN(num)) return val;

          if (i % 2 === 0) {
            return (num * matrix.a + matrix.e).toFixed(2);
          }
          return (num * matrix.d + matrix.f).toFixed(2);
        });

      return `${command} ${transformedValues.join(" ")}`;
    },
  );
}

export async function convertSvgUrlToSinglePath(svgUrl: string): Promise<string> {
  const svgString = await fetchSvg(svgUrl);
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  const paths = doc.querySelectorAll("path");
  let mergedPathData = "";

  paths.forEach((path) => {
    const d = path.getAttribute("d") || "";
    const transform = path.getAttribute("transform");

    if (transform) {
      const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      newPath.setAttribute("d", d);
      newPath.setAttribute("transform", transform);
      const transformedD = applyTransformation(newPath);
      mergedPathData += `${transformedD} `;
    } else {
      mergedPathData += `${d} `;
    }
  });

  return `<path d="${mergedPathData.trim()}" />`;
}
