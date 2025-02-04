import { readFile, writeFile } from 'node:fs';
readFile('backend/react-flow.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const csv = toGraphCSV(data);
    writeFile('backend/graph.csv', csv, () => { });
});

function toGraphCSV(jsonStr) {
    const json = JSON.parse(jsonStr);
    return json.edges.map(
        edge => [edge.target, edge.source].join(',')
    ).join(',\n');
};
