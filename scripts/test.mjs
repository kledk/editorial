#!/usr/bin/env zx
$.verbose = false;
const workspacesOut = await $`yarn workspaces list --json`;
const workspaces = workspacesOut.stdout
  .split("\n")
  .filter((json) => json !== "")
  .map((json) => JSON.parse(json))
  .filter((workspace) => typeof workspace.name === "string")
  .filter((workspace) => workspace.name !== "_template");

console.log(workspaces);
