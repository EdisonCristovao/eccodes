import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { find } from "lodash";

export const notionClient = new Client({
  auth: "secret_2UFRQ8I9m93x77Hw06QDtkTTATZGdx77SXPC1r1To5T",
});

export async function getBlockFromNotion(blockId: string) {
  try {
    const { results } = await notionClient.blocks.children.list({
      block_id: blockId,
    });

    const codeBlock = find(results, (block) => {
      if ("type" in block) {
        return block.type === "code";
      }
      return false;
    }) as BlockObjectResponse;

    return codeBlock;
  } catch (error) {
    console.error(error);
  }

  return [];
}
