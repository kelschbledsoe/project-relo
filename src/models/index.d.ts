import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Post {
  readonly id: string;
  readonly text?: string;
  readonly authorsID: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Authors {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly Posts?: (Post | null)[];
  constructor(init: ModelInit<Authors>);
  static copyOf(source: Authors, mutator: (draft: MutableModel<Authors>) => MutableModel<Authors> | void): Authors;
}