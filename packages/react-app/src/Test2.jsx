import React, { useEffect, useState } from 'react';

export function Test2() {
  const [count, setCount] = useState(2)

  useEffect(() => {
    console.log(2);
    setCount((prev) => prev += 2)
  }, [])

  return count
}
