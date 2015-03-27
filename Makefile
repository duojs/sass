NODE ?= node
NODE_FLAGS ?= $(shell $(NODE) --v8-options | grep generators | cut -d ' ' -f 3)

test: node_modules
	@$(NODE) $(NODE_FLAGS) test/test.js

node_modules: package.json
	@npm install

clean:
	@rm -rf test/fixtures/**/build
	@rm -rf test/fixtures/**/components

.PHONY: test
