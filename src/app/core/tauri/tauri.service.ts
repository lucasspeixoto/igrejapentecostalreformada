import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class TauriService {

  get isTauri(): boolean {
    return !!(window && window.__TAURI__);
  }

  public async callHelloWorld(): Promise<string> {
    return await invoke<string>('hello_world_command');
  }
}
