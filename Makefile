SASS = $(wildcard test/fixtures/*/*.scss)
CSS = $(SASS:.scss=.css)

test: node_modules $(CSS)
	@node test/test.js

node_modules: package.json
	@npm install
	@touch $@

%.css: %.scss
	@./node_modules/.bin/duo --use index.js $< > $@

clean:
	@rm -rf test/fixtures/**/components
	@rm -rf test/fixtures/**/*.css

.PHONY: test
