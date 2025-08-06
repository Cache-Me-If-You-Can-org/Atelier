import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Overview({product}) {
  return (
    <div>
      Overview
      {JSON.stringify(product)}
    </div>
  )
}

export default Overview;