import { useEffect, useState } from "react";
import "./App.css";

const myname = "Vikram";

const showName = <h1>My name is {myname}</h1>;

const formatName = (user) => (
  <h1>My spouses name is {user.firstName + " " + user.lastName}</h1>
);
const tick = () => {
  <h1>It is {new Date().toLocaleTimeString()}</h1>;
};

const Avatar = (props) => (
  <img className="Avatar" src={props.url} alt={props.alt} />
);

const User = (props) => {
  return (
    <div className="UserInfo">
      <Avatar url={props.user.avatarUrl} alt={props.user.name} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
};

const formatDate = (date) => date.toLocaleDateString();

const Comment = (props) => {
  return (
    <div className="Comment">
      <User user={props.user} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
};

const comment = {
  date: new Date(),
  text: "test comment",
  user: {
    name: "AJ",
    avatarUrl: "http://placekitten.com/g/64/64",
  },
};

const Clock = (props) => {
  return <h1>It is now {props.date.toLocaleTimeString()}</h1>;
};

const Form = (props) => {
  const [docName, setDocName] = useState("");
  const [language, setLanguage] = useState("");
  const [onlineToggle, setOnlineToggle] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormMsg(docName + language + onlineToggle);
  };

  return (
    <form action="/">
      <input
        name="docName"
        value={docName}
        onChange={(e) => setDocName(e.target.value)}
        required
      />
      <select
        name="language"
        defaultValue={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      >
        <option disabled value="">
          Select an option
        </option>
        <option value="EN">English</option>
        <option value="TM">Tamil</option>
        <option value="JS">JavaScript</option>
      </select>
      <input
        name="onlineOnly"
        type="checkbox"
        value={onlineToggle}
        onChange={(e) => setOnlineToggle(e.target.checked)}
      />
      <button onClick={handleFormSubmit}>Submit</button>
      <div id="formData">{formMsg}</div>
    </form>
  );
};

function Tempcalculator(props) {
  const [temp, setTemp] = useState();

  useEffect(() => {
    if (parseFloat(temp) > 100) console.log("boiling");
    else console.log("cooling");
  }, [temp]);

  return (
    <fieldset>
      <legend>Enter temperature in Celsius:</legend>
      <input value={temp} onChange={(e) => setTemp(e.target.value)} />
    </fieldset>
  );
}

const Products = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

function SearchBar(props) {
  return (
    <div className="search">
      <input
        name="search"
        value={props.searchTerm}
        onChange={(e) => props.handleSearch(e.target.value)}
      />
      <input
        type="checkbox"
        name="stock"
        value={props.stock}
        onChange={(e) => props.handleStock(e.target.checked)}
      />
    </div>
  );
}

function ProductRow(props) {
  return (
    <tr>
      <td>{props.product.name}</td>
      <td className={!props.product.stocked ? "notStocked" : "stocked"}>
        {props.product.price}
      </td>
    </tr>
  );
}

function ProductTable(props) {
  const filteredProducts = [];
  let lastCategory = null;
  props.products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(props.searchTerm.toLowerCase()) === -1
    ) {
      return;
    }

    if (props.stock && !product.stocked) {
      return;
    }

    if (lastCategory !== product.category) {
      filteredProducts.push(
        <tr>
          <td colSpan="2">{product.category}</td>
        </tr>
      );
    }

    filteredProducts.push(<ProductRow key={product.name} product={product} />);

    lastCategory = product.category;
  });

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {filteredProducts}
      </tbody>
    </table>
  );
}

function SortableComponent() {
  const [query, setQuery] = useState("");
  const [inStock, setInStock] = useState(false);

  return (
    <>
      <SearchBar
        searchTerm={query}
        stock={inStock}
        handleSearch={(e) => setQuery(e)}
        handleStock={(e) => setInStock(e)}
      />
      <ProductTable searchTerm={query} stock={inStock} products={Products} />
    </>
  );
}

function App() {
  const [time, setTime] = useState(new Date());

  const spouse = {
    firstName: "avanthi",
    lastName: "jayaraman",
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);
  // }, []);

  return (
    <>
      {showName}
      {formatName(spouse)}
      <Comment user={comment.user} date={comment.date} text={comment.text} />
      <Clock date={time} />
      <Form />
      <Tempcalculator />
      <SortableComponent />
    </>
  );
}

export default App;
