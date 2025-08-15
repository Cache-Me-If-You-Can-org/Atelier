import React from 'react';
import * as styles from './relatedOutfit.module.css';

export default function ComparisonTable({ related, original }) {
  const relatedFeatures = related.features;
  const originalFeatures = original.features;
  const rows = [];
  const features = [];
  const relatedObj = {};
  const originalObj = {};

  function addRow(row, col1, col3) {
    const newRow = row;
    newRow.col1 = col1;
    newRow.col3 = col3;
    rows.push(newRow);
  }

  for (let i = 0; i < relatedFeatures.length + originalFeatures.length; i += 1) {
    const origin = originalFeatures[i];
    const rel = relatedFeatures[i];

    if (!rel && !origin) break;

    if (origin) {
      if (!features.includes(origin.feature)) features.push(origin.feature);
      originalObj[origin.feature] = origin.value;
    }

    if (rel) {
      if (!features.includes(rel.feature)) features.push(rel.feature);
      relatedObj[rel.feature] = rel.value;
    }
  }

  for (let i = 0; i < features.length; i += 1) {
    const feature = features[i];
    const originFeat = originalObj[feature];
    const relFeat = relatedObj[feature];
    const col1Check = originFeat === true ? '✓' : originFeat;
    const col3Check = relFeat === true ? '✓' : relFeat;
    const row = {
      id: i,
      col2: feature,
    };

    if (!originFeat) {
      addRow(row, ' ', col3Check);
    } else if (!relFeat) {
      addRow(row, col1Check, ' ');
    } else if (originFeat === relFeat) {
      addRow(row, col1Check, col3Check);
    } else {
      addRow(row, col1Check, relFeat === false ? ' ' : relFeat);
    }
  }

  return (
    <>
      <small>COMPARING</small>
      <table className={styles.table} role='table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>{original.name}</th>
            <th />
            <th style={{ textAlign: 'right' }}>{related.name}</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: 12 }}>
                No rows
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id}>
                <td>{r.col1}</td>
                <td className={styles.tableCenter}>{r.col2}</td>
                <td style={{ textAlign: 'right' }}>{r.col3}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
