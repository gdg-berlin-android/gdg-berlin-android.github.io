#!/bin/bash
#
# Please exevute me from the img folder to regenerate the favicons.
#

re="^.*-([0-9]+)x([0-9]+).*$";
for f in *x*png; do
	if [[ "${f}" =~ ${re} ]]; then
		w="${BASH_REMATCH[1]}";
		h="${BASH_REMATCH[2]}";

		convert \
			-monitor \
			-gravity center \
			-resize ${w}x${h} \
			-extent ${w}x${h} \
			-background none \
			gdg-berlin-android-voltron-beheaded.png \
			$f;
	fi
done

