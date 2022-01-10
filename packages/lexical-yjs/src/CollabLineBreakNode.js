/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type {LineBreakNode, NodeKey} from 'lexical';
import type {CollabElementNode} from './CollabElementNode';
import type {Map as YMap} from 'yjs';
import type {Binding} from '.';

import {$isLineBreakNode, $getNodeByKey} from 'lexical';

export class CollabLineBreakNode {
  _map: YMap;
  _key: NodeKey;
  _parent: CollabElementNode;
  _type: 'linebreak';

  constructor(map: YMap, parent: CollabElementNode) {
    this._key = '';
    this._map = map;
    this._parent = parent;
    this._type = 'linebreak';
  }

  getNode(): null | LineBreakNode {
    const node = $getNodeByKey(this._key);
    return $isLineBreakNode(node) ? node : null;
  }

  getKey(): NodeKey {
    return this._key;
  }

  getSharedType(): YMap {
    return this._map;
  }

  getType(): string {
    return this._type;
  }

  getSize(): number {
    return 1;
  }

  getOffset(): number {
    const collabElementNode = this._parent;
    return collabElementNode.getChildOffset(this);
  }

  destroy(binding: Binding): void {
    const collabNodeMap = binding.collabNodeMap;
    collabNodeMap.delete(this._key);
  }
}

export function $createCollabLineBreakNode(
  map: YMap,
  parent: CollabElementNode,
): CollabLineBreakNode {
  const collabNode = new CollabLineBreakNode(map, parent);
  // $FlowFixMe: internal field
  map._collabNode = collabNode;
  return collabNode;
}
