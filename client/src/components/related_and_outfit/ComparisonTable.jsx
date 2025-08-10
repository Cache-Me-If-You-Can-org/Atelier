import * as styles from './relatedOutfit.module.css';

export default function ComparisonTable({ related, original }) {
  const relatedFeatures = related.features;
  const originalFeatures = original.features;
  var rows = [];
  var features = [];
  var relatedObj = [];
  var originalObj = [];

  function addRow(row, col1, col3) {
    row.col1 = col1;
    row.col3 = col3;
    rows.push(row);
  }

  for (var i = 0; i < relatedFeatures.length + originalFeatures.length; i++) {
    if (!relatedFeatures[i] && !originalFeatures[i]) break;

    if (originalFeatures[i]) {
      if (!features.includes(originalFeatures[i].feature)) features.push(originalFeatures[i].feature);
      originalObj[originalFeatures[i].feature] = originalFeatures[i].value;
    }
    if (relatedFeatures[i]) {
      if (!features.includes(relatedFeatures[i].feature)) features.push(relatedFeatures[i].feature);
      relatedObj[relatedFeatures[i].feature] = relatedFeatures[i].value;
    }
  }

  for (var i = 0; i < features.length; i++) {
    var row = {
      id: i,
      col2: features[i]
    };
    if (originalObj[features[i]]) {
      if (relatedObj[features[i]]) {
        if (originalObj[features[i]] === relatedObj[features[i]]) {
          if (originalObj[features[i]] === true) {
            addRow(row, '✓', '✓');
          } else {
            addRow(row, originalObj[features[i]], relatedObj[features[i]]);
          }
          continue;
        }
        addRow(row,
          originalObj[features[i]] === true ? '✓' : originalObj[features[i]],
          relatedObj[features[i]] === false ? ' ' : relatedObj[features[i]]
        );
        continue;
      }
      addRow(row, originalObj[features[i]] === true ? '✓' : originalObj[features[i]], ' ');
      continue;
    } else {
      addRow(row, ' ', relatedObj[features[i]] === true ? '✓' : relatedObj[features[i]]);
    }
  }

  return(
    <>
      <small>COMPARING</small>
      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>{original.name}</th>
            <th></th>
            <th style={{ textAlign: "right" }}>{related.name}</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: 12 }}>
                No rows
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id ?? `${r.col1}-${r.col2}-${r.col3}`}>
                <td>{r.col1}</td>
                <td className={styles.tableCenter}>{r.col2}</td>
                <td style={{ textAlign: "right" }}>{r.col3}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  )
}