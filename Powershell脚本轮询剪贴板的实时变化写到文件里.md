- 在`公司上网机`执行, `公司上网机`用向日葵连接`自己电脑`, 再利用向日葵自动同步两个机子的剪贴板的功能, 用Powershell脚本轮询剪贴板的实时变化写到共享文件里, 可实现`自己电脑`复制,`公司上网机`检测到自动写到`文件共享机`的文件里, `公司电脑`实时读到`文件共享机`的文件内容
- 注意编码问题,`Powershell` 默认支持`UTF8-BOM`,用windows自带记事本保存一遍不然会报错
- 保存为 `xxx.ps1`文件
```shell
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class ClipboardHelper
{
    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool OpenClipboard(IntPtr hWndNewOwner);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool CloseClipboard();

    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr GetClipboardData(uint uFormat);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool IsClipboardFormatAvailable(uint format);

    [DllImport("kernel32.dll")]
    public static extern IntPtr GlobalLock(IntPtr hMem);

    [DllImport("kernel32.dll")]
    public static extern bool GlobalUnlock(IntPtr hMem);

    [DllImport("user32.dll")]
    public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();
}
"@

$prevText = ""
$filePath = "\\192.168.1.111\autosync\auto sync notepad.md" #网络路径

while ($true) {
    $hwnd = [ClipboardHelper]::GetForegroundWindow()
    [ClipboardHelper]::OpenClipboard($hwnd)
    if ([ClipboardHelper]::IsClipboardFormatAvailable(13)) {
        $hData = [ClipboardHelper]::GetClipboardData(13)
        $ptr = [ClipboardHelper]::GlobalLock($hData)
        $text = [System.Runtime.InteropServices.Marshal]::PtrToStringUni($ptr)
        [ClipboardHelper]::GlobalUnlock($hData)
        if ($text -ne $prevText) {
            Write-Host $text
            $text | Out-File -FilePath $filePath -Append -Encoding UTF8
            $prevText = $text
            $logEntry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss'): Clipboard content changed: $text"
            Write-Host $logEntry
        }
    }
    [ClipboardHelper]::CloseClipboard()
    Start-Sleep -Milliseconds 500

    # 清空控制台屏幕内容
    Clear-Host
}
```
