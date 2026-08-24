[//]: # (VERSION_PLACEHOLDER DO NOT DELETE)
[//]: # (Used when working on a new release.)
[//]: # (Nothing here is optional. If a step must not be performed, it must be said so)
[//]: # (Do not fill the version, it will be done automatically)
[//]: # (Quick Intro to what is the focus of this release)

## Breaking Changes

[//]: # (### *Breaking Change*)
[//]: # (Describe the breaking change AND explain how to resolve it)
[//]: # (You can utilize internal links /e.g. link to the upgrade procedure, link to the improvement|deprecation that introduced this/)

## Deprecations

[//]: # (### *Deprecation*)
[//]: # (Explain what is deprecated and suggest alternatives)

[//]: # (Features -> New Functionality)

## Features

[//]: # (### *Feature Name*)
[//]: # (Describe the feature)
[//]: # (Optional But higlhy recommended Specify *NONE* if missing)
[//]: # (#### Relevant Documentation:)

[//]: # (Improvements -> Bugfixes/hotfixes or general improvements)

## Improvements

[//]: # (### *Improvement Name* )
[//]: # (Talk ONLY regarding the improvement)
[//]: # (Optional But higlhy recommended)
[//]: # (#### Previous Behavior)
[//]: # (Explain how it used to behave, regarding to the change)
[//]: # (Optional But higlhy recommended)
[//]: # (#### New Behavior)
[//]: # (Explain how it behaves now, regarding to the change)
[//]: # (Optional But higlhy recommended Specify *NONE* if missing)
[//]: # (#### Relevant Documentation:)

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

[//]: # (Explain in details if something needs to be done)
