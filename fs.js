
export default class FileSystem {

    async pickDirectory() {
        const dir = await window.showDirectoryPicker({
            "mode": "readwrite"
        });
        return dir;
    }

    async getDirHandle(fromDirHandle, targetDirName) {
        return await fromDirHandle.getDirectoryHandle(targetDirName);
    }

    async getFileHandle(fromDirHandle, targetFileName) {
        return await fromDirHandle.getFileHandle(targetFileName);
    }

    async existsDir(fromDirHandle, targetDirName) {
        try {
            await fromDirHandle.getDirectoryHandle(targetDirName);
        } catch (error) {
            if (error.name === "NotFoundError") {
                return false;
            } else {
                throw error;
            }
        }
        return true;
    }

    async existsFile(fromDirHandle, targetFileName) {
        try {
            await fromDirHandle.getFileHandle(targetFileName);
        } catch (error) {
            if (error.name === "NotFoundError") {
                return false;
            } else {
                throw error;
            }
        }
        return true;
    }

    async readFile(fileHandle) {

        function readFileAsText(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsText(file);
            });
        }

        const file = await fileHandle.getFile();
        return await readFileAsText(file);
    }

    async writeFile(fileHandle, content) {
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    }

    async createFile(dirHandle, fileName) {
        return await dirHandle.getFileHandle(fileName, { create: true });
    }

    async renameFile(fromDirHandle, oldFileName, newFileName) {
        const oldFileHandle = await fromDirHandle.getFileHandle(oldFileName);
        const oldFileContent = await this.readFile(oldFileHandle);
        await this.writeFile(await this.createFile(fromDirHandle, newFileName), oldFileContent);
        await this.removeFile(fromDirHandle, oldFileName);
    }

    async removeFile(fromDirHandle, targetFileName) {
        await fromDirHandle.removeEntry(targetFileName);
    }

}