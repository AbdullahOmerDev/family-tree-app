import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";

// Convert flat list to hierarchical structure
const buildTree = (nodes) => {
  const nodeMap = {};
  nodes.forEach((node) => {
    nodeMap[node.id] = { name: node.name, children: [] };
  });
  let root = null;
  nodes.forEach((node) => {
    if (node.parent) {
      nodeMap[node.parent].children.push(nodeMap[node.id]);
    } else {
      root = nodeMap[node.id];
    }
  });
  return root;
};

const data = buildTree(require("./family-tree.json")); // Assume the JSON is in the same folder

const containerStyles = {
  width: "100%",
  height: "100vh",
};

export default function FamilyTree() {
  const treeRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const dimensions = treeRef.current?.getBoundingClientRect();
    if (dimensions) {
      setTranslate({ x: dimensions.width / 2, y: 100 });
    }
  }, []);

  return (
    <div style={containerStyles} ref={treeRef}>
      <Tree
        data={data}
        translate={translate}
        orientation="vertical"
        zoomable
        collapsible
        pathFunc="elbow"
      />
    </div>
  );
}
