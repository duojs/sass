test: node_modules
	@node test/test.js

node_modules: package.json
	@npm install
	@touch $@

clean:
	@rm -rf test/fixtures/**/build
	@rm -rf test/fixtures/**/components

.PHONY: test
