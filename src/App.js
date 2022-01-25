import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Container } from "semantic-ui-react";
import "./App.css";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import EntryLines from "./components/EntryLines";
import MainHeader from "./components/MainHeader";
import ModalEdit from "./components/ModalEdit";
import NewEntryForm from "./components/NewEntryForm";

function App() {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [entries, setEntries] = useState(initialEntries);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!isOpen && entryId) {
      const index = entries.findIndex((entry) => entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntries(newEntries);
      resetEntry();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.map(entry => {
      if (entry.isExpense) {
        return totalExpense += Number(entry.value);
      }else{
        return totalIncome += Number(entry.value);
      }
    })
    setTotal(totalIncome - totalExpense);
    setExpenseTotal(totalExpense);
    setIncomeTotal(totalIncome);
  }, [entries]);
  

  // const deleteEntry = (id) =>{}
  function deleteEntry(id) {
    const result = entries.filter((entry) => entry.id !== id);
    console.log("entries", entries);
    console.log("result", result);
    setEntries(result);
  }

  function resetEntry() {
    setDescription("");
    setValue("");
    setIsExpense(true);
  }

  function editEntry(id) {
    console.log("edit entry with id ", id);
    if (id) {
      const index = entries.findIndex((entry) => entry.id === id);
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  }

  function addEntry() {
    const result = entries.concat({
      id: entries.length + 1,
      description,
      value,
      isExpense,
    });
    console.log("result", result);
    console.log("entries", entries);
    setEntries(result);
    resetEntry();
  }

  return (
    <Container>
      <MainHeader tittle="Budgets"></MainHeader>

      <DisplayBalance
        tittle="Your Balence:"
        value={total}
        size="small"
      ></DisplayBalance>

      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} ></DisplayBalances>

      <MainHeader tittle="History" type="h3"></MainHeader>

      <EntryLines
        entries={entries}
        deleteEntry={deleteEntry}
        editEntry={editEntry}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></EntryLines>

      <MainHeader tittle="Add New Transaction" type="h3"></MainHeader>

      <NewEntryForm
        addEntry={addEntry}
        description={description}
        setDescription={setDescription}
        value={value}
        setValue={setValue}
        isExpense={isExpense}
        setIsExpense={setIsExpense}
      ></NewEntryForm>
      <ModalEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addEntry={addEntry}
        description={description}
        setDescription={setDescription}
        value={value}
        setValue={setValue}
        isExpense={isExpense}
        setIsExpense={setIsExpense}
      ></ModalEdit>
    </Container>
  );
}

export default App;

var initialEntries = [
  {
    id: 1,
    description: "Work income 1",
    value: 1000.00,
    isExpense: false,
  },
  {
    id: 2,
    description: "Water bill",
    value: 20,
    isExpense: true,
  },
  {
    id: 3,
    description: "Rent",
    value: 300,
    isExpense: true,
  },
  {
    id: 4,
    description: "Power Bill",
    value: 50,
    isExpense: true,
  },
];
