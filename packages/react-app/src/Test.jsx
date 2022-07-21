import React, { useEffect, useState } from 'react';

export function Test() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    console.log(1);
    setCount((prev) => prev += 1)
  }, [])

  return count
}
