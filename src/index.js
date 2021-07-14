const { writeFileSync, readFileSync } = require("fs");
const { set, get, has, unset } = require("lodash");

class Database {
    filname = "database.json"
	all() {
		const file = readFileSync(this.filname, "utf-8");
		const data = JSON.parse(file);
		return data;
	}

	set(name, value) {
		const data = this.all();
		set(data, name, value);
		writeFileSync(this.filname, JSON.stringify(data));
		return get(this.all(), name);
	}

	push(name, value) {
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

	add(name, value) {
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

	subtract(name, value) {
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

	delete(name) {
		if (!this.get(name)) return false;
		unset(this.all, name);
		writeFileSync(this.filname, JSON.stringify(this.all));
		return true;
	}

	get(name) {
		const gets = get(this.all, name);
		if (!gets) return null;
		return gets;
	}
	fetch = this.get;
	has = (name) => has(this.all, name);
}
module.exports = new Database();