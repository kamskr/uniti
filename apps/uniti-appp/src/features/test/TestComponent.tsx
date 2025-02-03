import React from "react";
import { Pressable, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createContext } from "zustand-di";

interface CounterState {
	count: number;
	inc: () => void;
}

const [Provider, useStore] = createContext<CounterState>();

const createStore = (initialState: { count: number }) =>
	create<CounterState>((set) => ({
		count: initialState.count,
		inc: () => set((state) => ({ count: state.count + 1 })),
	}));

export const TestComponent = () => {
	const { data, isLoading, error } = useQuery<string>({
		queryKey: ["test"],
		queryFn: () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve("test");
				}, 1000);
			});
		},
	});

	return (
		<Provider createStore={() => createStore({ count: 0 })}>
			<View>
				<Text>Query Result: {data}</Text>
				<Text>Is Loading: {isLoading.toString()}</Text>
				<Text>Error: {error?.message}</Text>
				<Counter />
			</View>
		</Provider>
	);
};

function Counter() {
	const { count, inc } = useStore((state) => state);
	return (
		<View>
			<Pressable onPress={inc}>
				<Text>increment</Text>
			</Pressable>
			<Text>count: {count}</Text>
		</View>
	);
}
