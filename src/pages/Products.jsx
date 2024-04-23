import ViewActiveProducts from "../component/ViewActiveProducts";
import { Container } from "react-bootstrap";
export default function Products() {
  return (
    <Container
      fluid
      className="min-vh-100 min-vw-100 text-bg-success bg-opacity-75 pb-5 overflow-x-hidden"
    >
      <ViewActiveProducts />
    </Container>
  );
}
