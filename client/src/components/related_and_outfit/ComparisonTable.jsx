import * as styles from './relatedOutfit.module.css';

export default function ComparisonTable({ related, original }) {
  const relatedFeatures = related.features;
  const originalFeatures = original.features;
  var rows = [];
  var features = [];
  var relatedObj = {};
  var originalObj = {};

  function addRow(row, col1, col3) {
    row.col1 = col1;
    row.col3 = col3;
    rows.push(row);
  }

  for (var i = 0; i < relatedFeatures.length + originalFeatures.length; i++) {
    var origin = originalFeatures[i]
    var rel = relatedFeatures[i];

    if (!rel && !origin) break;

    if (origin) {
      features.includes(origin.feature) || features.push(origin.feature);
      originalObj[origin.feature] = origin.value;
    }

    if (rel) {
      features.includes(rel.feature) || features.push(rel.feature);
      relatedObj[rel.feature] = rel.value;
    }
  }

  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    var originFeat = originalObj[feature];
    var relFeat = relatedObj[feature];
    var col1Check  = originFeat === true ? '✓' : originFeat;
    var col3Check  = relFeat === true ? '✓' : relFeat;
    var row = {
      id: i,
      col2: feature
    };

    if (!originFeat) {
      addRow(row, ' ', col3Check);
    } else if (!relFeat) {
      addRow(row, col1Check, ' ');
    } else if (originFeat === relFeat) {
      addRow(row, col1Check, col3Check);
    } else {
      addRow(row, col1Check,
        relFeat === false ? ' ' : relFeat
      );
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