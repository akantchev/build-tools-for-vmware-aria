# v4.25.0

## Breaking Changes


## Deprecations



## Features



## Improvements


### *Fix issue with connection to external Orchestrator for VCF 9*

So far, it wasn't possible to connect to external Orchestrator using BTVA, because it always used external Orchestrator host as authentication host. Now BTVA autodetects if this is external Orchestrator, and in case it is, it replaces host with authhost, just for authentication.

### *Fix issue with asking for VRA authentication parameters twice, when embedded Orchestrator is used for VCFA host*

This bug was observed only in interactive mode for the installer - it asked twice for same authentication parameters when both VCFA and embedded Orchestrator are used.

### *Removed CSP host ask in interactive mode for VRA/VCFA packages*

For both VRA and VCFA packages, installer will stop asking for CSP (authentication host, a legacy coming from cloud VRA). Instead, CSP will be always same as VRA/VCFA host.

### *Removed Import mode ask in interactive mode for Orchestrator packages*

For Orchestrator packages, installer will stop asking for Import mode (a legacy coming from VRO 7). Instead, this value will be always set to SKIP.

### *Fix push operation failure for VCF Ops Custom Groups import when no Policy is defined*

#### Previous Behavior

During push operation if a Custom Group doesn't have "policy" field or the value is empty the operation fails with the following error: `Policy 'null' could not be found on the target system`.

#### New Behavior
The import (push) operation for Custom Group allows for impty "policy" field and skips the operation that explicitly assigns a Policy to the Custom Group. This allows VCF Ops to use the system Default Policy for the Custom Group and dynamically update (assign) it when a new Policy is set as Default.

## Upgrade procedure

