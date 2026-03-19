import React from "react";
import { AgentResponse } from "../agents/interfaces";

interface AgentLogProps {
  logs: AgentResponse[];
}

export const AgentLog: React.FC<AgentLogProps> = ({ logs }) => (
  <div>
    <h2>Agent Logs & Decisions</h2>
    <ul>
      {logs.map((log, idx) => (
        <li key={idx}>
          <strong>{log.agent}:</strong> {log.reasoning}
          <pre>{JSON.stringify(log.result, null, 2)}</pre>
        </li>
      ))}
    </ul>
  </div>
);
