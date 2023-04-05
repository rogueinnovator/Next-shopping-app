import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function Shoping() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <Button variant="dark" onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
}
export default Shoping;
