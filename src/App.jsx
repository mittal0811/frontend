import Form from "./Form";
import { COLORS } from "./theme/colors";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <Form></Form>
    </div>
  );
};

export default App;
