import { fireEvent, getByTestId, render, within } from "@testing-library/react";
import App from "./App";

test("if it renders heading", () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("heading")).toHaveTextContent("Todomatic");
});

test("if todo input is empty initially and submit button is disabled", () => {
  const { getByTestId } = render(<App />);
  const todoInput = getByTestId("todoInput");
  const submitButton = getByTestId("submit");

  expect(todoInput).toHaveValue("");
  expect(submitButton).toBeDisabled();
});

test("if value is getting added to list after form submital and if input is getting cleared", () => {
  const { getByTestId } = render(<App />);
  const todoInput = getByTestId("todoInput");
  const form = getByTestId("form");
  const todoList = getByTestId("list");

  fireEvent.change(todoInput, { target: { value: "task 1" } });
  fireEvent.submit(form);

  const listItem = within(todoList).getByText("task 1");
  expect(listItem).toBeDefined();
  expect(todoInput).toHaveValue("");
});

test("if listitem has buttons named mark as complete and delete", async () => {
  const { getByTestId } = render(<App />);
  const todoInput = getByTestId("todoInput");
  const form = getByTestId("form");

  fireEvent.change(todoInput, { target: { value: "task 1" } });
  fireEvent.submit(form);

  const listItem = getByTestId("listItem");
  const markAsCompleteButton = await within(listItem).findByText(
    "Mark as complete"
  );
  const deleteButton = await within(listItem).findByText("Delete");

  expect(markAsCompleteButton).toBeDefined();
  expect(deleteButton).toBeDefined();
});

test("if completed is appended to list item text if mark as complete is clicked and if mark as incomplete button is present", async () => {
  const { getByTestId } = render(<App />);
  const todoInput = getByTestId("todoInput");
  const form = getByTestId("form");

  fireEvent.change(todoInput, { target: { value: "task 1" } });
  fireEvent.submit(form);

  const listItem = getByTestId("listItem");
  const markAsCompleteButton = await within(listItem).findByText(
    "Mark as complete"
  );

  fireEvent.click(markAsCompleteButton);
  const itemText = getByTestId("itemText");

  const markAsInCompleteButton = await within(listItem).findByText(
    "Mark as incomplete"
  );

  expect(markAsInCompleteButton).toBeDefined();
  expect(itemText).toHaveTextContent("completed");
});

test("if listitem is removed when delete button is clicked", async () => {
  const { getByTestId, queryByTestId } = render(<App />);
  const todoInput = getByTestId("todoInput");
  const form = getByTestId("form");

  fireEvent.change(todoInput, { target: { value: "task 1" } });
  fireEvent.submit(form);

  let listItem = getByTestId("listItem");
  const deleteButton = await within(listItem).findByText("Delete");

  fireEvent.click(deleteButton);
  listItem = queryByTestId("listItem");
  expect(listItem).toBeNull();
});