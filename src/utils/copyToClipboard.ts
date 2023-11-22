import store from "../store/globalStore";
import toasterSlice from "../store/toaster";

export default async function copyToClipboard(data: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(data);
      store.dispatch(toasterSlice.actions.open({
        message: 'Data copied to clipboard',
        severity: 'success'
      }));
    } catch (err) {
      store.dispatch(toasterSlice.actions.open({
        message: 'Failed to copy data to clipboard',
        severity: 'error'
      }));
      console.error('Failed to copy data to clipboard:', err);
    }
  }