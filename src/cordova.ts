export async function fetchText(path: string): Promise<string> {
  if (((window as any).cordova || cordova) && cordova.file) {
    return new Promise((resolve, reject) => {
      (window as any).resolveLocalFileSystemURL(`${cordova.file.applicationDirectory}www/${path}`,
      (fileEntry: any) => {
        fileEntry.file((f: any) => {
          const reader = new FileReader();
          reader.onloadend = function() {
            resolve(this.result as string);
          }
          reader.readAsText(f);
        })
      },
      (e: any) => reject(e));
    })
  } else {
    return (await fetch(path)).text();
  }
}