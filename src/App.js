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
import { useDispatch, useSelector } from "react-redux";
import { getAllEntries } from "./actions/entries.actions";

function App() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const entries = useSelector((state) => state.entries);
  const { isOpen, id } = useSelector((state) => state.modals);
  const [entry, setEntry] = useState();

  useEffect(() => {
    const index = entries.findIndex((entry) => entry.id === id);
    setEntry(entries[index]);
  }, [isOpen, id, entries]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.map((entry) => {
      if (entry.isExpense) {
        return (totalExpense += Number(entry.value));
      } else {
        return (totalIncome += Number(entry.value));
      }
    });
    setTotal(totalIncome - totalExpense);
    setExpenseTotal(totalExpense);
    setIncomeTotal(totalIncome);
  }, [entries]);

  // const deleteEntry = (id) =>{}
  // function deleteEntry(id) {
  // }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEntries());
  }, []);

  return (
    <Container>
      <MainHeader tittle="Budgets"></MainHeader>

      <DisplayBalance
        tittle="Your Balence:"
        value={total}
        size="small"
      ></DisplayBalance>

      <DisplayBalances
        incomeTotal={incomeTotal}
        expenseTotal={expenseTotal}
      ></DisplayBalances>

      <MainHeader tittle="History" type="h3"></MainHeader>

      <EntryLines entries={entries} isOpen={isOpen}></EntryLines>

      <MainHeader tittle="Add New Transaction" type="h3"></MainHeader>

      <NewEntryForm></NewEntryForm>
      <ModalEdit isOpen={isOpen} {...entry}></ModalEdit>
    </Container>
  );
}

export default App;
