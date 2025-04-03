import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {App} from './App';

test("добавление новой задачи", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Введите ваши дела");
  fireEvent.change(input, { target: { value: "Новая задача" } });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(screen.getByText("Новая задача")).toBeInTheDocument();
});

test("переключение состояния задачи", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Введите ваши дела");
  fireEvent.change(input, { target: { value: "Тестовая задача" } });
  fireEvent.keyDown(input, { key: "Enter" });
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("фильтрация задач", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Введите ваши дела");
  fireEvent.change(input, { target: { value: "Активная задача" } });
  fireEvent.keyDown(input, { key: "Enter" });
  const completedCheckbox = screen.getByRole("checkbox");
  fireEvent.click(completedCheckbox);
  fireEvent.click(screen.getByText("Активные"));
  expect(screen.queryByText("Активная задача")).not.toBeInTheDocument();
});

test("удаление завершенных задач", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Введите ваши дела");
  fireEvent.change(input, { target: { value: "Завершенная задача" } });
  fireEvent.keyDown(input, { key: "Enter" });
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  fireEvent.click(screen.getByText("Удалить завершенные"));
  expect(screen.queryByText("Завершенная задача")).not.toBeInTheDocument();
});