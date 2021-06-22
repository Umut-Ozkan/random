import { writeFileSync, readFileSync } from "fs";
import { set, get, has, unset } from "lodash";

class Database {
	public filname = `./database.astroide`
	public all() {
		const file = readFileSync(this.filname, "utf-8");
		const data = JSON.parse(file);
		return data;
	}

	public set(name: string, value: unknown) {
		const data = this.all();
		set(data, name, value);
		writeFileSync(this.filname, JSON.stringify(data));
		return get(this.all(), name);
	}

	public push(name: string, value: unknown) {
		let savedData = this.get(name);	
		if(!savedData) {
			this.set(name,[])
			savedData = this.get(name)
		}
		if (!Array.isArray(savedData))
			throw new Error("Data to push should be an array");
		savedData.push(value);
		this.set(name, savedData);
		return savedData;
	}

	public add(name: string, value: number) {
		let savedData = this.get(name);	
		if(!savedData) {
			this.set(name,0)
			savedData = this.get(name)
		}
		if (isNaN(savedData))
			throw new Error("Data to add should be a number");
		savedData += value;
		this.set(name, savedData);
		return savedData;
	}

	public subtract(name: string, value: number) {
		let savedData = this.get(name);	
		if(!savedData) {
			this.set(name,0)
			savedData = this.get(name)
		}
		if (isNaN(savedData))
			throw new Error("Data to subtract should be a number");
		savedData -= value;
		this.set(name, savedData);
		return savedData;
	}

	public delete(name: string) {
		if (!this.get(name)) return false;
		unset(this.all, name);
		writeFileSync(this.filname, JSON.stringify(this.all));
		return true;
	}

	public get(name: string) {
		const gets = get(this.all, name);
		if (!gets) return null;
		return gets;
	}
	public fetch = this.get;
	public has = (name: string) => has(this.all, name);
}
export = new Database();
