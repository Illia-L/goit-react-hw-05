import { useState } from "react";

export default function(apiCb, initialValue) {
  const [state, setState] = useState(initialValue);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  async function loadData(...params) {
    try {
      setIsPending(true);
      setIsError(false);

      const state = await apiCb(...params);

      setState(state);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }

  return [state, isPending, isError, loadData]
}