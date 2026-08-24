import MenuBarModule from '../modules/MenuBarModule';

export type AppleAppId = {
  appIdId: string;
  identifier: string;
  name: string;
  expirationDate?: string;
};

export async function listAppleAppIdsAsync(appleId: string): Promise<AppleAppId[]> {
  const result = await MenuBarModule.runCli('list-app-ids', ['--apple-id', appleId]);
  return JSON.parse(result) as AppleAppId[];
}

export async function deleteAppleAppIdAsync(appleId: string, appIdId: string): Promise<void> {
  await MenuBarModule.runCli('delete-app-id', ['--apple-id', appleId, '--app-id-id', appIdId]);
}
