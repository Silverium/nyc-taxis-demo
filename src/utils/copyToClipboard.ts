export default async function copyToClipboard(data: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(data);
      // TODO: move to a toast
      console.log('Data copied to clipboard');
    } catch (err) {
      console.error('Failed to copy data to clipboard:', err);
    }
  }