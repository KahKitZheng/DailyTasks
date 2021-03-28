import React, { Component } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import Layout from "./Layout";
import ListCard from "../components/ListCard";

export default function ListScreen() {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ListCard
          title="School"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          color="#FFCD2D"
          list=""
        />
        <ListCard
          title="Groceries"
          description="Odit blanditiis laudantium, commodi praesentium sint doloribus accusamus fuga nesciunt quam vitae ex, inventore quod tenetur? Alias sed ipsam ducimus inventore qui."
          color="#00E392"
          list=""
        />
        <ListCard
          title="School"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          color="#FFCD2D"
          list=""
        />
        <ListCard
          title="Groceries"
          description="Odit blanditiis laudantium, commodi praesentium sint doloribus accusamus fuga nesciunt quam vitae ex, inventore quod tenetur? Alias sed ipsam ducimus inventore qui."
          color="#00E392"
          list=""
        />
        <ListCard
          title="School"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          color="#FFCD2D"
          list=""
        />
        <ListCard
          title="Groceries"
          description="Odit blanditiis laudantium, commodi praesentium sint doloribus accusamus fuga nesciunt quam vitae ex, inventore quod tenetur? Alias sed ipsam ducimus inventore qui."
          color="#00E392"
          list=""
        />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});
