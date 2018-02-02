/* global suite, test */

import proceduralColor from "../src/procedural-color";
// import {hash} from "../src/procedural-color";
import murmurhash3gc from "../src/murmurhash3_gc";
import murmurhash2 from "../src/murmurhash2";
import chai from "chai";
const expect = chai.expect;

function testHashFunction (hash, name) {
  suite(`hashing function: ${name}`, function () {
    test("should produce a very different value for two similar strings", function () {
      const v1 = hash("foo");
      const v2 = hash("hoo");
      const diff = Math.abs(v1 - v2);
      expect(diff).to.be.greaterThan(1000)
    })
    test("should produce a very different value for strings that are only different at the end", function () {
      const v1 = hash("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at rutrum mi. Etiam mollis risus in venenatis euismod. Duis sollicitudin, sapien in condimentum vehicula, massa nibh vehicula tellus, sed efficitur odio risus at nisl. Etiam molestie et dui non maximus. Mauris ullamcorper gravida nisi non fringilla. Mauris tincidunt urna quam, quis placerat mauris tincidunt nec. Sed congue blandit ipsum, vel rhoncus turpis accumsan ac. Curabitur vitae dui rhoncus, lacinia ante non, cursus dui. Vivamus magna augue, cursus sed dui nec, congue efficitur orci. Fusce vel euismod massa. Curabitur sit amet felis scelerisque, pharetra risus non, bibendum sem. Maecenas non justo sapien");
      const v2 = hash("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at rutrum mi. Etiam mollis risus in venenatis euismod. Duis sollicitudin, sapien in condimentum vehicula, massa nibh vehicula tellus, sed efficitur odio risus at nisl. Etiam molestie et dui non maximus. Mauris ullamcorper gravida nisi non fringilla. Mauris tincidunt urna quam, quis placerat mauris tincidunt nec. Sed congue blandit ipsum, vel rhoncus turpis accumsan ac. Curabitur vitae dui rhoncus, lacinia ante non, cursus dui. Vivamus magna augue, cursus sed dui nec, congue efficitur orci. Fusce vel euismod massa. Curabitur sit amet felis scelerisque, pharetra risus non, bibendum sem. Maecenas non justo sapieo");
      const diff = Math.abs(v1 - v2);
      expect(diff).to.be.greaterThan(1000)
    })
    test("should produce a very different value for strings that are only different at the start", function () {
      const v1 = hash("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at rutrum mi. Etiam mollis risus in venenatis euismod. Duis sollicitudin, sapien in condimentum vehicula, massa nibh vehicula tellus, sed efficitur odio risus at nisl. Etiam molestie et dui non maximus. Mauris ullamcorper gravida nisi non fringilla. Mauris tincidunt urna quam, quis placerat mauris tincidunt nec. Sed congue blandit ipsum, vel rhoncus turpis accumsan ac. Curabitur vitae dui rhoncus, lacinia ante non, cursus dui. Vivamus magna augue, cursus sed dui nec, congue efficitur orci. Fusce vel euismod massa. Curabitur sit amet felis scelerisque, pharetra risus non, bibendum sem. Maecenas non justo sapien");
      const v2 = hash("Morem ipsum dolor sit amet, consectetur adipiscing elit. Proin at rutrum mi. Etiam mollis risus in venenatis euismod. Duis sollicitudin, sapien in condimentum vehicula, massa nibh vehicula tellus, sed efficitur odio risus at nisl. Etiam molestie et dui non maximus. Mauris ullamcorper gravida nisi non fringilla. Mauris tincidunt urna quam, quis placerat mauris tincidunt nec. Sed congue blandit ipsum, vel rhoncus turpis accumsan ac. Curabitur vitae dui rhoncus, lacinia ante non, cursus dui. Vivamus magna augue, cursus sed dui nec, congue efficitur orci. Fusce vel euismod massa. Curabitur sit amet felis scelerisque, pharetra risus non, bibendum sem. Maecenas non justo sapien");
      const diff = Math.abs(v1 - v2);
      expect(diff).to.be.greaterThan(1000)
    })
  })
}

testHashFunction(murmurhash2, "murmurhash2");
testHashFunction(murmurhash3gc, "murmurhash3gc");


suite("proceduralColor", function () {

  test("should produce a color given a string", function () {
    expect(proceduralColor("hey")).to.be.ok;
  })

  // suiteSetup(function () {
  //   this.results = [
  //     "flibbit",
  //     "libbit",
  //     "flibbi",
  //     "flibit",
  //     "flobbit",
  //     "flibbitflibbit",
  //     "flibbitflibbitflibbit",
  //   ].map(proceduralColor);
  // })
  // test("should be different for different inputs", function () {
  //   const results = {};
  //   for (const color of results) {
  //     expect(results[color.toHexString()]).to.be.undefined;
  //   }
  // })
})
