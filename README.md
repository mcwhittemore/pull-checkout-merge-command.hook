# Pull, Checkout, Merge... COMMAND!

Run scripts after certain git commands are used. Great for compiled source mangeagement between branches and automating magrations.

## Usage

```
hooks add pull-checkout-merge-command.hook
```

Open package.json and add "pcm-command" param to your scripts.

```
{
	"name": "my-cool-tool",
	"scripts":{
		"pcm-command": "echo \"this runs"\"
	}
}
```

## Runs on

* git pull
* git merge
* git checkout

## Change Log

### 0.0.0

The first draft.